import { auth, googleProvider, signInWithPopup } from "@/lib/firebase.config";
import { UserRepository } from "@/repository/user_repository";
import { UserTypes } from "@/types/user_types";


export class FirebaseService {
    private user = new UserRepository();

    async siginWidthGoogleProvider({ cb = (res: number)=>{} }): Promise<void> {        
        try {
            const {displayName, email, photoURL} = (await signInWithPopup(auth, googleProvider)).user;
            const data: UserTypes = {
                firstname: displayName?.split(' ')[0],
                lastname: displayName?.split(' ')[1],
                email: email as string,
                picture_uri: photoURL as string,
                created_at: Date.now()
            };

            await this.user.auth_login_user(data);
            cb(200);
        }
        catch { cb(400); }
    }

}