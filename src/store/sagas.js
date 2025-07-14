import * as authSagas from "./auth/saga";
import * as productsSagas from "./products/saga";

const sagas = {
    ...productsSagas,
    ...authSagas,
};

export default sagas;