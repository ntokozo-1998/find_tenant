//const bcrypt = require("bcrypt")
const database = require("../config/db-config");
const jwt = require("jsonwebtoken");

const Pool = require('pg').Pool;

const saltRounds = 12;
const db = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'tenant_db', //Database database
    password: 'admin12345', //Database password
    port: 5433//Database port
  });


exports.register = async (req, res)=>{ 

    const { email , password ,fullname ,usertype, phone, address } = req.body;

    const sql = 'SELECT * FROM users WHERE email = $1 ';
    db.query(sql,[email],(err, results)=>{
        if(results.rowCount == 0)
        {
        
                db.query(

                    'INSERT INTO users (fullname,email,password,usertype,phone,address,image,rating,ratings_counter) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING user_id',[fullname,email,password,usertype,phone,address,defaultImage,defaultRating,defaultCounter],
                    (db_err,results) => {

                        if(db_err)
                        {
                            res.status(400).json({message:'Query failed'});
                        }else
                        {
                            res.status(200).json({message: fullname+' has been registered, Please login'});
                        }
            
            })
        }else
        {
            res.status(400).json({message:'User already exists, Please login!'});
        }
    });
}


// exports.forgotPassword  = (req, res) =>{
//     const email = req.body.email;
//     const sql = "SELECT * FROM users WHERE email = $1";
//     db.query(sql,[email],(err, results)=>{
//         if(results.rowCount == 0)
//         {
//             res.status(400).json({message:'No user registered with this email address'})
//         }
//         else
//         {
//             emailDetails.from = sender;
//             emailDetails.to = results.rows[0].email;
//             emailDetails.text = "Good day "+results.rows[0].name+'\n\nAs per request, please find your password\n'+results.rows[0].password+'\nUse the credentials to sign in to your account. \n\n';
        
//             emailDetails.subject = "Credentials request";

//             transporter.sendMail(emailDetails,(emailErr)=>{
//                 if(emailErr){
//                     res.status(400).json(emailErr);
//                 }else{
//                     res.status(200).json({message:'Your password has been sent to your to your email address'})
//                 }
//             });


            
//         }

    // })





// }

exports.login =  (req, res)=>{
    
    const {email,password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = $1';
    db.query(sql,[email],(err, results)=>{
        if(err) 
        {res.status(400).json({message: "Error communicating with database"})}
        else{
            if(results.rowCount == 0)
            {
                res.status(400).json({message: "User does not exist, Please register"})
            }else{
                //bcrypt.compare(password,results.rows[0].password,(passErr,result)=> {
                    if(password != results.rows[0].password)
                    {
                        res.status(400).json({message: "Invalid Credentials, Please try again"});

                    }else
                    {
                        const token = jwt.sign({
                                user_id: results.rows[0].user_id,
                                email: results.rows[0].email,
                                fullname: results.rows[0].fullname,
                                usertype: results.rows[0].usertype,
                                password: results.rows[0].password,
                                image: results.rows[0].image,
                                rating: results.rows[0].rating
                            },
                            'retyuihhgdxfcghvjbkhgfxgfchtfu',{

                                algorithm: 'HS256',
                                expiresIn: 120
                            });
                            res.status(200).json({message: "Welcome! "+results.rows[0].fullname,token: token,}); 
                   }
                //})
                 
                    
                }

            

        }

    })  
}

exports.getOneUser = (req, res) => {

    const user_id = req.params.user_id;
    //console.log(user_id);

    const sql = 'SELECT * FROM users WHERE user_id = $1';
    db.query(sql,[user_id],(err, results)=>{
        if(err) {
            //console.log(err)
             res.status(400).json({message:'Query failed'}) }else{
            res.status(200).json(results.rows[0]);
        }
    })
}


exports.updateUser = async (req, res)=>{
   
    const user_id = req.params.user_id;
    const { password ,fullname } = req.body;
  
    db.query(
      'UPDATE users SET password = $1 ,fullname = $2  WHERE user_id = $3',
        [password ,fullname , user_id],
       (error,results) => {
        if (error) {
            res.status(400).json({message:'Query failed'});
        }else {res.status(200).json({message:'Your profile was updated successfully'});}
    
      })
}

exports.updateImage = async (req,res) => {

    const link = req.body.link;
    const user_id = req.params.user_id;

    db.query('UPDATE users SET image = $1 WHERE user_id = $2',[link,user_id],(err,results)=>{
        if(err){
            res.status(400).json({message:err.message});
        }else
        {
            res.status(200).json({message:'Your profile picture was updated successfully'});
        }

    })

}

//Progress status function
// exports.pstatus = async (req, res)=>{
 
 
//     const {toDo,doing,done} = req.body;

//     const {post_id,client_id,dev_id} = req.params;
  
//     const sql = 'SELECT * FROM users WHERE user_id =$1';
  
//     db.query(sql,[client_id],(db_err,clientResults)=>{
//         if (db_err) {
//             res.status(400).json({message:error.message});
//         }else {
  
//             db.query("SELECT * FROM posts WHERE post_id =$1",[post_id],(db_error, postResults)=>{
//                 if (db_error) {
//                     res.status(400).json({message:db_error.message});
//                 }else{

//                     db.query(sql,[dev_id],(db_err,devResults)=>{
//                         if (db_err) {
//                             res.status(400).json({message:db_err.message});
//                         }else{
                            

//                             emailDetails.from = sender;
//                             emailDetails.to = clientResults.rows[0].email;
//                             emailDetails.subject = "REPORT:"+postResults.rows[0].post_title;

//                             emailDetails.text = "Hi "+clientResults.rows[0].name+"\n\nThis is a report based on your post ("+postResults.rows[0].post_title+") from "+devResults.rows[0].name+"\n\nTasks to-do:\n"+toDo+"\n\nTasks Currently Doing:\n"+doing+"\n\nTasks Done:\n"+done+"\n\n\nDeveloper\n"+devResults.rows[0].name

//                             transporter.sendMail(emailDetails,(emailErr)=>{
//                                 if(emailErr){
//                                     res.status(400).json(emailErr.message);
              
//                                 }else{
//                                     res.status(200).json({message:'Report sent to the client'});
//                                 }
//                             })
    
//                         }
    
//                     })

//                 }

//             })        
           
//         }
  
//     })
  
  
//  }
 