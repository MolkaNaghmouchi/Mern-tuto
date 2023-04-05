
//La première ligne importe deux fonctions de Redux Toolkit, createSlice et createAsyncThunk.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//La troisième ligne importe un module appelé authService, qui contient des fonctions pour interagir avec une API d'authentification.
import authService from "./authService";
//GET user from localStorage
//La quatrième ligne extrait l'utilisateur enregistré précédemment à partir du stockage local du navigateur.
// Si l'utilisateur est trouvé dans le stockage local, il est stocké dans l'état initial. Sinon, l'état initial est défini sur null.
const user = JSON.parse(localStorage.getItem("user"));
//La variable initialState est un objet qui représente l'état initial de la partie auth du magasin Redux. 
//Il contient l'utilisateur enregistré précédemment ou null, 
//ainsi que des indicateurs de chargement, d'erreur et de succès pour les futures actions.
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register user : lezemni service file pour la demande http Request / je dois cree un service applee authService
//La fonction 'register' est créée à l'aide de createAsyncThunk. Cela signifie qu'elle est une action asynchrone qui peut être gérée par Redux Toolkit. Il envoie une demande d'enregistrement d'utilisateur à l'aide de la fonction authService.register. 
//Si la demande est réussie, elle renvoie les données utilisateur. Si elle échoue, elle renvoie un objet d'erreur.

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
);



// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})








//La fonction createSlice est utilisée pour créer un tranche d'état auth du magasin Redux. 
//Il a des fonctions pour gérer les états de chargement, d'erreur et de succès pour l'action register.

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Le reducer reset est créé à l'aide de createSlice, qui réinitialise les indicateurs de chargement, d'erreur et de succès dans l'état auth.
    rest: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = " ";
    },
  },
  //La méthode extraReducers est utilisée pour ajouter des gestionnaires de cas pour les actions qui ne sont pas traitées par les reducers générés automatiquement par createSlice.
  // Dans ce cas, nous avons ajouté des gestionnaires pour les états de chargement, d'erreur et de succès de l'action 'register'.
  extraReducers: (builder) => {
    builder.
    addCase(register.pending , (state)=>{
      state.isLoading=true
    })
    .addCase(register.fulfilled , (state , action) =>{
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    .addCase(register.rejected , (state , action )=>{
      state.isLoading= false
      state.isLoading= false
      //en cas de rejeter et qu'il va passer dans le message comme valeur comme payload donc c'est 
      state.message = action.payload
      state.user= null
    })

  
    .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null
    })
},
})


// k testaa3ml men fou9 reducers donc lezeemk test3ml export default const {rest}
//Enfin, nous exportons le reducer authSlice.reducer généré par createSlice ainsi que l'action reset créée par createSlice.

export const { reset } = authSlice.actions
export default authSlice.reducer