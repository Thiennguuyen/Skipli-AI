import firebase from '../firebase.js';
import nodemailer from 'nodemailer'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  runTransaction
} from 'firebase/firestore';

const db = getFirestore(firebase);

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail
    auth: {
        user: 'thien.nguyenbkhcm2k1@hcmut.edu.vn',
        pass: 'jbwp rzak ezle aleg',
    },
});

const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        await addDoc(collection(db, 'users'), data);
        res.status(200).send('product created successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = doc(db, 'users', id);
      const data = await getDoc(user);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('product not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

const MiddleWareCreateNew = async (req, res, next) => {
    try {
        // console.log(req.body)
        const email = req.body.email;
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        let userDoc = null;
        querySnapshot.forEach(doc => {
            userDoc = { id: doc.id, ...doc.data() };
        });
        if (querySnapshot.empty) {
            await addDoc(collection(db, 'users'), {
                email: email,
                digitCode: 0
            });
        }
        req.userFound = userDoc;
        return next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}

const CreateNewAccessCode = async (req, res, next) => {
    const digitCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
    const email = req.body.email
    try {    
        const user = doc(db, 'users', req.userFound.id);
        await updateDoc(user, {
            digitCode: digitCode
        });

        // Send email with the digit code
        const mailOptions = {
            from: 'thienph20062001@gmail.com',
            to: email,
            subject: 'YOUR DIGIT CODE TO ACCESS SKIPLI AI',
            text: `Welcome to Skipli AI, your digit code is: ${digitCode}`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json({ message: 'Email sent successfully', id: req.userFound.id });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const ValidateAccessCode = async (req, res, next) => {
    var id = req.cookies['uid'];
    const docRef = doc(db, 'users', id)
    try {
        await runTransaction(db, async (transaction) => {
            const docSnapshot = await transaction.get(docRef);
            if (!docSnapshot.exists()) {
                throw new Error("Document does not exist!");
            }
            const data = docSnapshot.data();
            if (data.digitCode != req.body.code) {
                throw new Error("The digitCode is not true!");
            }
            // Update the document
            transaction.update(docRef, { digitCode: 0 });
        });
      
        res.status(200).send({
            message: "Transaction success",
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export {createUser, getUser, MiddleWareCreateNew, CreateNewAccessCode, ValidateAccessCode}