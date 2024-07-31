import firebase from '../firebase.js';
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

// const { GoogleGenerativeAI } = require("@google/generative-ai");
const safe = {
    "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
    "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
    "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
    "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE",
};
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI("AIzaSyB5XwlbKiGjFEEgCJbouSe-6ZfhSna4DKc");

const db = getFirestore(firebase);

const GeneratePostCaptions = async (req, res, next) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safe});
    const { socialNetwork, subject, tone } = req.body;
    const prompt = `Write one short caption for ${socialNetwork} post with topic: ${subject}. The caption sound like ${tone} and have hashtag`
    try {
        let arrResult = [];
        for (let i = 0; i <= 4; i++) {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            arrResult.push(text)
        }
        return res.status(200).send({
            message: "Create captions successfully",
            arrResult: arrResult
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const SaveGeneratedContent = async (req, res, next) => {
    try {
        const data = req.body;
        await addDoc(collection(db, 'posts'), data);
        res.status(200).send('post created successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const GetPostIdeas = async (req, res, next) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safe});
    const topic = req.body.topic;
    const prompt = `Give me a one-line idea for a social post related to topic: ${topic} (no icon and hashtag)`
    try {
        let arrResult = [];
        for (let i = 0; i < 10; i++) {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            arrResult.push(text)
        }
        return res.status(200).send({
            message: "Create captions successfully",
            arrResult: arrResult
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const CreateCaptionsFromIdeas = async (req, res, next) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safe});
    const topic = req.body.idea;
    const prompt = `Write one short social media post with the idea: ${topic}`
    try {
        let arrResult = [];
        for (let i = 0; i <= 4; i++) {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            arrResult.push(text)
        }
        return res.status(200).send({
            message: "Create captions successfully",
            arrResult: arrResult
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const GetUserGeneratedContents = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        var groupData = {};
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = { id: doc.id, ...doc.data() };
            const topic = data.topic // Group by attribute
            if (!groupData[topic]) {
                groupData[topic] = [];
            }
            groupData[topic].push(data);
        });
        res.status(200).send({
            message: 'Get captions successfully',
            result: groupData
        })  
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deletePost= async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, 'posts', id));
        res.status(200).send('post deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export {GeneratePostCaptions, SaveGeneratedContent, GetPostIdeas, CreateCaptionsFromIdeas, GetUserGeneratedContents, deletePost}