const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const mongoose= require("mongoose");
const dotenv=require('dotenv');
dotenv.config();
const result=dotenv.config();
if(result.error)
{
    throw result.error;
}
const { parsed: envs } = result;

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhQGdtYWlsLmNvbSIsImlhdCI6MTY1NTIyNTExOH0.LQdEeb369g0JM0dQsdLxp6UN1JhAXUGGRuBhCFIM0oA';
let id='62a31f406a125c710d54ab34';
let bid='62a1a70451f3d2da1a28719f';

beforeAll(async () => {
    mongoose.connect(envs.MONGO_URI)
    .then(()=>console.log(`connection successful`))
    .catch((err)=>console.log(`${err}`));
});


describe("Integration for user api",()=>{
    it("get all users", async()=> {
        const res = await request.get("/users/user").set({'authorization':`${token}`});
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            expect.arrayContaining(
                [
                    expect.objectContaining({
                        id:expect.any(String),
                        firstName:expect.any(String),
                        lastName:expect.any(String),
                        email:expect.any(String),
                        mobileNumber:expect.any(String),
                        bookIssued:expect.any(String),
                        //    address:expect.objectContaining({
                        //        city:expect.any(String),
                        //        state:expect.any(String),
                        //        faltNo:expect.any(Number)
                        //    })
                    })
                ]
            )
        )
    });

    it("add new user", async()=> {
        const res = await request.post("/users/user").set({'authorization':`${token}`}).send({
            "firstname":"xxxx",
            "lastname":"dddd",
            "email":"vsh@123",
            "mobileNumber":"6788909878",
            "bookIssued":"",
            "password":"@123",
            "address":{
                "city":"jaipur",
                "state":"raj",
                "flatNo":12
            }
        });
        expect(res.status).toBe(200);
    });

    it("success -update a user",async ()=> {
        const res = await request.patch(`/users/user/${id}`).set({'authorization':`${token}`}).send({
            firstName:"newName",
            lastName:"newLname",
        });
        expect(res.status).toBe(200);
        expect(res.body.code).toBe(0);
        expect(res.body.message).toBe("user updated successfully");
    });
    it("failure -update a user not found", async()=> {
        id='22a31f406a125c710d52ac34';
        const res = await request.patch(`/users/user/${id}`).set({'authorization':`${token}`}).send({
            firstName:"newName",
            lastName:"newLname",
        });
        expect(res.status).toBe(404);
        expect(res.body.code).toBe(-1);
        expect(res.body.message).toBe("user not found");
    });

    it("success -issue a book", async()=> {
        const res = await request.get(`/users/user/issueBook/${bid}/${id}`).set({'authorization':`${token}`});
        expect(res.status).toBe(200);
    });
    it("failure -issue a book not found", async()=> {
    id=" ";   
    const res = await request.get(`/users/user/issueBook/${bid}/${id}`).set({'authorization':`${token}`});
        expect(res.status).toBe(404);
    });

    it("success -user login", async()=> {
        const res = await request.post("/users/login").set({'authorization':`${token}`}).send({
            "email": "ya@gmail.com",
            "password":"ya@123"
        });
        expect(res.status).toBe(200);
    });
    it("failure -user login email not found", async()=> {
        const res = await request.post("/users/login").set({'authorization':`${token}`}).send({
            "email": "dcsd",
            "password":"ya@3"
        });
        expect(res.status).toBe(404);
        expect(res.body.code).toBe(-1);
        expect(res.body.message).toBe("no user found");
    });
    it("failure -user login wrong password", async()=> {
        const res = await request.post("/users/login").set({'authorization':`${token}`}).send({
            "email": "ya@gmail.com",
            "password":"@123"
        });
        expect(res.status).toBe(500);
        expect(res.body.code).toBe(-1);
        expect(res.body.message).toBe("incorrect password");
    });

    it("success -delete a user", async()=> {
        id='22a33f406a112c710d52ac34';
        const res = await request.delete(`/users/user/${id}`).set({'authorization':`${token}`});
        expect(res.status).toBe(404);
    });
    it("failure -delete a user not found", async()=> {
        id='22a33f406a112c710d52ac34';
        const res = await request.delete(`/users/user/${id}`).set({'authorization':`${token}`});
        expect(res.status).toBe(404);
        expect(res.body.code).toBe(-1);
        expect(res.body.message).toBe("no user found");
    });

});

afterEach(() => {
    // request.disconnect();
    // mongoose.disconnect();
});