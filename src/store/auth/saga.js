import { call, put, takeLatest } from "redux-saga/effects";
import { login, loginSuccess, loginFailure } from "./slice";
import authService from "../../services/AuthService";

function* handleLogin({ payload }) {
    try {
        const data = yield call(authService.login, payload);

        localStorage.setItem("token", data.token);

        yield put(loginSuccess(data.token));
    } catch (error) {
        const message =
            error.response?.data?.error ||
            error.message ||
            "Login failed. Please try again.";
        yield put(loginFailure(message));
    }
}

export function* watchLogin() {
    yield takeLatest(login.type, handleLogin);
}
