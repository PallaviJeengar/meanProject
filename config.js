const dotenv=require('dotenv');
dotenv.config();
const result=dotenv.config();
if(result.error)
{
    throw result.error;
}
const { parsed: envs } = result;

const mongoose=require('mongoose');
mongoose.connect(envs.MONGO_URI)
.then(()=>console.log(`connection successful`))
.catch((err)=>console.log(`${err}`));

module.exports = envs;