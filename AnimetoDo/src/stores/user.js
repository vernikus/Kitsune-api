import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../fireBaseConfig";
import {ref} from 'vue'
import { useRouter } from "vue-router";

export const useUser = defineStore('userStore', () =>{
    const data = ref(null)
    const router = useRouter()
    const loadingUser = ref(false)
    const loadingSesion = ref(false)
    
    const registerUser = async(email,password) =>{
        try{
            loadingUser.value = true
            const {user} = await createUserWithEmailAndPassword(auth,email, password) 
            data.value = {email : user.email, uid : user.uid}
            router.push('/')
            console.log(user)
        }catch(err){
            console.log(err)
        }finally{
            loadingUser.value = false
        }
    }
    const loginUser = async (email,password) =>{
        try{    
            loadingUser.value = true
            const {user} = await signInWithEmailAndPassword(auth, email , password)
            data.value = {email : user.email, uid : user.uid}
            router.push('/')

        }catch(err){
            console.log(err)
        }finally{
            loadingUser.value = false
        }
    }
    const logoutUser = async () =>{
        try{
            await signOut(auth)
            data.value = null
            router.push('/login')

        }catch(err){
            console.log(err)
        }
    }
    const currentUser = () =>{
        return new Promise((res,rej) =>{
            const unsuscribe = onAuthStateChanged(auth,user =>{
                if(user){
                    data.value = {email : user.email, uid : user.uid}
                }else{
                    data.value = null
                }
                res(user)
            }, err => rej(err))
            unsuscribe()
        })
    }
    return{
        registerUser,
        loginUser,
        logoutUser,
        loadingUser,
        currentUser,
        data,
        loadingSesion
    }
})
