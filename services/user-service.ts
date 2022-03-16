import { compare, hash } from "bcrypt";
import { encrypt, decrypt } from "../utils/crypto";
import { writeEmail, sendEmail } from "../utils/sendgrid";
import { createToken } from "../utils/jwt";
import IUser from "../interfaces/i-user";

const userService = (repository: any) => ({
  async signIn(user: any) {
    const { email, password } = user;

    const currentUser: IUser = await repository.getByEmail(email);

    if (!currentUser) return { errorMessage: "User doesn't exist" };
    if (!currentUser.validation)
      return { errorMessage: "Your account is not yet validate !" };

    const isPasswordCorrect: boolean = await compare(
      password,
      currentUser.password
    );

    if (!isPasswordCorrect) return { errorMessage: "Invalid credentials" };

    const token: string = createToken({
      email: currentUser.email,
      id: currentUser.id,
    });

    return { result: currentUser, token };
  },

  async signUp(user: any) {
    const { name, email, password } = user;

    const oldUser: IUser = await repository.getByEmail(email);

    if (oldUser) return { errorMessage: "User already exists" };

    const hashedPassword: string = await hash(password, 12);

    const newUser: IUser = await repository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const { id } = newUser;

    const verifyToken = encrypt(`${id}-${email}`);

    const text = `Thanks for creating an account, please confirm your email !
    Click go to : /validate/${verifyToken}`;

    sendEmail(writeEmail({ to: email, text }));

    const token: string = createToken({ email, id });

    return { result: newUser, token };
  },

  async validate(verifyToken: string) {
    const decryptToken = decrypt(verifyToken);
    const id = decryptToken.split("-")[0];
    const email = decryptToken.split("-")[1];

    const isAccount: IUser = await repository.checkAccount(email, id);
    if (!isAccount)
      return { errorMessage: "Your identify key is not available !" };

    const confirmAccount: IUser = await repository.confirmAccount(id);

    return { result: confirmAccount };
  },

  async forgotPassword(email: string) {
    //je veux récupérer le compte du user via l'email
    const oldUser: IUser = await repository.getByEmail(email);

    if (!oldUser) return { errorMessage: "User doesn't exist" };

    const verifyToken = encrypt(email);

    //j'envoie le mail pour changer de mdp
    const text = `Your forgot your password!
    Click on this link to reset it : /newPassword/${verifyToken}`;

    sendEmail(writeEmail({ to: email, text }));

    return { message: "Email sent" };
  },

  async newPassword(tokenEmail: string, password: string) {
    //décrypter le token email
    const decryptToken = decrypt(tokenEmail);

    //modification du mdp à l'utilisateur correspondant à l'email décrypté (cf 3 actions ci-dessous):

    //vérifier si un utilisateur avec cet email existe
    const isAccountExist: IUser = await repository.checkAccount(decryptToken);
    //s'il n'existe pas envoi d'un message d'erreur token Invalide
    if (!isAccountExist) return { errorMessage: "Your account doesn't exist!" };

    //si oui, on continue, appel de la fonction de modifcation password(email, password) - ( dans le repo)
    const confirmNewPassword: IUser = await repository.createNewPassword(
      decryptToken,
      password
    );

    return { result: confirmNewPassword };
  },
});

export default userService;
