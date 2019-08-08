
const state = {
    baseUser: localStorage.getItem('baseUser') ? JSON.parse(localStorage.getItem('baseUser')) : ""
}
export default {
    state,
}
