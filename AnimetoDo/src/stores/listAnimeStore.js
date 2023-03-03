import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import {ref} from 'vue'
import {db,auth} from '../fireBaseConfig'
import { nanoid } from "nanoid";
export const useListAnime = defineStore('useListAnime',() =>{
    const documents = ref([])
    const loadinDoc = ref(false)
    const getAnime = async() =>{
        if (documents.value.length !== 0) {
            return;
        }
        loadinDoc.value = true
        try{
            const q = query(collection(db,'animes'),where('user','==',auth.currentUser.uid))
            const snap = await getDocs(q)
            snap.forEach((doc) => {
                documents.value.push({
                    id: doc.id,
                    ...doc.data()
                })

            })
        }catch(err){
            console.log(err)
        }finally{
            loadinDoc.value = false
        }
    }
    const addAnime = async (name) =>{
        try{
            const objDoc = {
                name : name,
                short : nanoid(6),
                user : auth.currentUser.uid
            }
            const docRef = await addDoc(collection(db,'animes'),objDoc)
            documents.value.push({
                ...objDoc,
                id: docRef.id
            })
        }catch(err){
            console.log(err)
        }
    }
    const deletedAnime = async (id) =>{
        try{
            const docRef = doc(db,'animes',id)
            const docSnap = await getDoc(docRef)
            if(!docSnap.exists()){
                throw new Error('The document does not exist')
            }else if(docSnap.data().user !== auth.currentUser.uid){
                throw new Error('You do not have permission to delete this item')
            }else{
            await deleteDoc(docRef)
            documents.value = documents.value.filter(anime => anime.id !== id)

            }
            
        }catch(err){
            console.log(err)
        }finally{

        }
    }

    return{
        documents,
        loadinDoc,
        getAnime,
        addAnime,
        deletedAnime
    }
})