import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, updateDoc, setDoc, Timestamp } from "firebase/firestore";
import moment, { Moment } from "moment";
import { db } from "../../config/firebase";
import { RootState } from "../store";

export type ticketType = {
    id?: string;
    number: string;
    bookingCode: string;
    checkIn: number;
    dateRelease: Timestamp;
    dateUse: Timestamp;
    nameEvent: string;
    status: number;
    checked: boolean;
};

export const addTicket = createAsyncThunk(
    "ticket/add",
    async (values: ticketType) => {
        const newDoc = doc(collection(db, "tickets"));
        await setDoc(newDoc, values);
        const Ref = doc(db, "tickets", newDoc.id);
        const Snap = await getDoc(Ref);
        return Snap;
    }
);

interface IFilter {
    checkIn?: any;
    dateStart: Moment | null;
    dateEnd: Moment | null;
    status?: number;
    checked?: boolean;
}

export const getAll = createAsyncThunk(
    "ticket/getAll",
    async (filter?: IFilter) => {
        let tickets: ticketType[] = [];

        const query = await getDocs(collection(db, "tickets"));
        query.forEach((value) => {
            tickets.push({
                id: value.id,
                ...(value.data() as ticketType),
            });
        });
        if (filter) {
            console.log("filter");
            console.log(filter);
            tickets = tickets.filter((ticket) => {
                if (
                    filter.status != undefined &&
                    filter.status != null &&
                    ticket.status !== filter.status
                )
                    return false;
                if (
                    filter.checkIn != undefined &&
                    filter.checkIn.length > 0 &&
                    !filter.checkIn.includes(ticket.checkIn)
                )
                    return false;
                if (
                    filter.checked != undefined &&
                    filter.checked != null &&
                    ticket.checked !== filter.checked
                )
                    return false;
                if (filter.dateStart != null && filter.dateEnd != null) {
                    const dateProvider = moment(ticket.dateUse.toDate());
                    if (
                        filter.dateStart &&
                        !moment(filter.dateStart as Moment).isSameOrBefore(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }

                    if (
                        filter.dateEnd &&
                        !moment(filter.dateEnd as Moment).isSameOrAfter(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }
                }
                return true;
            });
        }
        tickets.reverse();
        return tickets;
    }
);

export const get = createAsyncThunk("ticket/get", async (id: string) => {
    let ticket: ticketType;

    const ticketRef = doc(db, "tickets", id);
    const ticketSnap = await getDoc(ticketRef);
    ticket = {
        id,
        ...(ticketSnap.data() as ticketType),
    };
    return ticket;
});

export const update = createAsyncThunk(
    "ticket/update",
    async ({ id, dateUse }: { id: string, dateUse: Timestamp}) => {
        const ref = doc(db, "tickets", id);
        await updateDoc(ref, { dateUse });
    }
);

interface defaultState {
    loading: boolean;
    ticket: ticketType | null;
    tickets: ticketType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

const initialState: defaultState = {
    loading: false,
    ticket: null,
    tickets: [],
    message: {
        fail: false,
        text: "",
    },
};

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTicket.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addTicket.fulfilled, (state, action) => {
            if (action.payload.exists()) {
                state.message.fail = false;
                state.message.text = "Thêm thành công!";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi!";
            }
            state.loading = false;
        });
        builder.addCase(addTicket.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.tickets = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi!";
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
                state.ticket = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi!";
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
            state.message.text = "Cập nhật thành công!";
            state.loading = false;
        });
        builder.addCase(update.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
    },
});

const ticketReducer = ticketSlice.reducer;
export const ticketSelector = (state: RootState) => state.ticketReducer;
export const {} = ticketSlice.actions;

export default ticketReducer;
