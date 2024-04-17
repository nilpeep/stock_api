"use strict";

//* Created a user model according to ERD

// DATA SAMPLE: [
//     {
//         "username": "admin",
//         "password": "aA*123456",
//         "email": "admin@site.com",
//         "firstName": "admin",
//         "lastName": "admin",
//         "isActive": true,
//         "isStaff": true,
//         "isAdmin": true
//     }
//     {
//         "username": "staff",
//         "password": "aA*123456",
//         "email": "staff@site.com",
//         "firstName": "staff",
//         "lastName": "staff",
//         "isActive": true,
//         "isStaff": true,
//         "isAdmin": false
//     }
//     {
//         "username": "test",
//         "password": "aA*123456",
//         "email": "test@site.com",
//         "firstName": "test",
//         "lastName": "test",
//         "isActive": true,
//         "isStaff": false,
//         "isAdmin": false
//     }
// ]

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");

//? User Model:

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", function (next){
    // this.password = bcrypt.hashSync(this.password, 10)
    // console.log('pre(save) runned')
    const data = this

    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

    if(isEmailValidated){
      console.log('email is ok')
      
      if(data?.password){
        const isPasswordValidated = data.password ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data.password) : true
        
        if(isPasswordValidated){
          this.password = passwordEncrypt(this.password)
        }else{
          next(new Error('password is not valid'))
        }
      }

    }else{
      next(new Error('email is not valid'))
    }

})

// Exports:

module.exports = mongoose.model("User", userSchema);






// / - Regex başlangıç sınırlayıcısı

// ^ - String'in başlangıcını belirtir

// \w+ - Bir veya daha fazla alfabetik karakter, rakam veya underscore (_) karakteri. Bunlar e-posta adresinin kullanıcı adı bölümünü temsil eder.

// ([\.-]?\w+)* - Nokta (.) veya tire (-) ve ardından bir veya daha fazla alfanumerik karakterden oluşan opsiyonel bir grup. E-posta adresinde bölüm ayırıcıları olarak kullanılabilir. * işareti bu grubun sıfır veya daha fazla kez tekrar edebileceğini gösterir.

// \@ - Bir @ sembolü arar.

// \w+ - E-posta adresinin domain kısmındaki alfanumerik karakterler.

// (\.[a-z]{2,3})+ - Nokta (.) ve ardından 2 veya 3 harften oluşan bir grup. Bu, e-posta adresinin uzantısını (com, net vb.) temsil eder.

// $ - String'in bitişini belirtir.
