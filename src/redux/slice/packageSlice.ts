import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, updateDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { RootState } from "../store";

export type ticketPackageType = {
    id?: string;
    code: string;
    expiryDate: Timestamp;
    applyDate: Timestamp;
    name: string;
    status: number;
    price: number;
    comboPrice?: number;
    quantity?: number;
};

export const addTicketPackage = createAsyncThunk(
    "ticketPackage/add",
    async (values: ticketPackageType) => {
        const newDoc = doc(collection(db, "ticketPackages"));
        await setDoc(newDoc, values);
        const Ref = doc(db, "ticketPackages", newDoc.id);
        const Snap = await getDoc(Ref);
        return Snap;
    }
);

interface Ifilter {
    active: boolean | null;
    connect: boolean | null;
    keywords: string;
}

export const getAll = createAsyncThunk(
    "ticketPackage/getAll",
    async (filter?: Ifilter) => {
        let ticketPackages: ticketPackageType[] = [];

        const query = await getDocs(collection(db, "ticketPackages"));
        query.forEach((value) => {
            ticketPackages.push({
                id: value.id,
                ...(value.data() as ticketPackageType),
            });
        });
        ticketPackages.reverse();
        return ticketPackages;
    }
);

export const get = createAsyncThunk("ticketPackage/get", async (id: string) => {
    let ticketPackage: ticketPackageType;

    const ticketPackageRef = doc(db, "ticketPackages", id);
    const ticketPackageSnap = await getDoc(ticketPackageRef);
    ticketPackage = {
        id,
        ...(ticketPackageSnap.data() as ticketPackageType),
    };
    return ticketPackage;
});

export const update = createAsyncThunk(
    "ticketPackage/update",
    async ({ id, ...value }: ticketPackageType) => {
        const ref = doc(db, "ticketPackages", id as string);
        await updateDoc(ref, { ...value });
    }
);

interface defaultState {
    loading: boolean;
    ticketPackage: ticketPackageType | null;
    ticketPackages: ticketPackageType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

const initialState: defaultState = {
    loading: false,
    ticketPackage: null,
    ticketPackages: [],
    message: {
        fail: false,
        text: "",
    },
};

const ticketPackageSlice = createSlice({
    name: "ticketPackage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTicketPackage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addTicketPackage.fulfilled, (state, action) => {
            if (action.payload.exists()) {
                state.message.fail = false;
                state.message.text = "Thêm thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(addTicketPackage.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.ticketPackages = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(getAll.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(get.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get.fulfilled, (state, action) => {
            if (action.payload) {
                state.ticketPackage = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(get.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(update.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(update.fulfilled, (state, action) => {
            state.message.fail = false;
            state.message.text = "Cập nhật thành công";
            state.loading = false;
        });
        builder.addCase(update.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
    },
});

const ticketPackageReducer = ticketPackageSlice.reducer;

export const ticketPackageSelector = (state: RootState) => state.ticketPackageReducer;

export const {} = ticketPackageSlice.actions;

export default ticketPackageReducer;
