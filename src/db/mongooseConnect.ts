import mongoose from "mongoose"; 

const url = "mongodb+srv://zeyadmousa:4ApJlgCaNVfR2R2L@cluster0.sdgpisa.mongodb.net/CoursesStore";

export const connect = mongoose.connect(url).then(() => {
    console.log('Mongodb Connected Success')
}).catch(err => {
    console.log(`Mongodb Erorrr ${err}`)
})