import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import firebase from "firebase";

// create user profile from authenticated user signup
export const createUser = createAsyncThunk(
    "user/createUser",
    async ({ user }) => {
        try {
            // post new user profile in db
            db
                .collection("users")
                .doc(user.uid)
                .set({
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    auth_uid: user.uid,
                    display_name: user.displayName.toLowerCase(),
                    email: user.email.toLowerCase(),
                    photo_url: user.photoURL
                },
                    {
                        merge: true
                    }
                )
        } catch (err) {
            console.log("Create user profile failed due to: ", err)
        }
    }
)

// set user on login but check if user exist in users
// if user not in usersDB, create user and setUser state
// create user profile from authenticated user signup
export const setUserOrCreateAndSet = createAsyncThunk(
    "user/setUserOrCreateAndSet",
    async ({ user }) => {
        try {
            // check if user exist in db users
            db
                .collection("users")
                .doc(user.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(user)
                    } else {
                        // post new user profile in db
                        db
                            .collection("users")
                            .doc(user.uid)
                            .set({
                                created: firebase.firestore.FieldValue.serverTimestamp(),
                                auth_uid: user.uid,
                                display_name: user.displayName.toLowerCase(),
                                email: user.email.toLowerCase(),
                                photo_url: user.photoURL
                            },
                                {
                                    merge: true
                                }
                            )
                    }
                })
        } catch (err) {
            console.log("Create user profile if not exist failed due to: ", err)
        }
    }
)

// create user profile from authenticated user signup
export const saveContact = createAsyncThunk(
    "user/saveContact",
    async ({user, id}) => {
        // console.log("user", user.uid, id)
        try {
            // post new user profile in db
            db
                .collection("users")
                .doc(user.uid)
                .update({
                    contacts: firebase.firestore.FieldValue.arrayUnion(id)
                },
                    {
                        merge: true
                    }
                )
        } catch (err) {
            console.log("Save contact failed due to: ", err)
        }
    }
)

// create user profile from authenticated user signup
export const removeContact = createAsyncThunk(
    "user/removeContact",
    async ({user, id}) => {
        // console.log("user", user.uid, id)
        try {
            // post new user profile in db
            db
                .collection("users")
                .doc(user.uid)
                .update({
                    contacts: firebase.firestore.FieldValue.arrayRemove(id)
                },
                    {
                        merge: true
                    }
                )
        } catch (err) {
            console.log("Remove contact failed due to: ", err)
        }
    }
)

// change the state based on the called function
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user = [...action.payload]
            })
            .addCase(createUser, (state) => {
                state.status = "failed";
            })
            .addCase(setUserOrCreateAndSet.fulfilled, (state, action) => {
                console.log("extra reducer user: ", action.payload)
            })
            .addCase(saveContact.fulfilled, (state, action) => {
                console.log("extra")
            })
    }
})

//action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;