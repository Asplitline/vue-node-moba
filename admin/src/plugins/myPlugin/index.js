const myPlugin = {}
import dayjs from 'dayjs'
myPlugin.install = (Vue => {
    Vue.filter('time', (val, fmt = 'YYYY-MM-DD HH:mm:ss') => {
        return dayjs(val).format(fmt)
    })
    Vue.mixin({
        methods: {
            getAuthHeaders () {
                console.log({ Authorization: 'Bearer ' + (localStorage.getItem('token') || '') })
                return {
                    Authorization: 'Bearer ' + (localStorage.getItem('token') || '')
                }
            }
        },
        computed: {
            uploadURL () {
                return this.$http.defaults.baseURL + '/upload'
            }
        }
    })
})

export default myPlugin