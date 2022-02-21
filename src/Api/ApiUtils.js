import axios from "axios";
import LocalStorage from "./LocalStorage";
//const API_URL = "https://sameteam.api.openxcell.dev/";
const API_URL = "http://8d59-103-250-139-223.ngrok.io/";

export const AWS_CONFIG = {
    bucketName: 'openxcell-development-public',
    dirName: 'sameteam',
    region: 'ap-south-1',
    accessKeyId: 'AKIAW4UEQAQLVMYFJR5H',
    secretAccessKey: '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'
}

const ApiUtils = {
    // login
    login: function (payload) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        //sameteam-api/admin/login
        return axios.post(API_URL + "v1/user/login", payload, {
            headers: headers,
        })
            .then(response => {
                console.log("Login an time par nu resoinse in api ut", response.data)
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },

    addsuperadmin: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/register", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },


    
    getTransactionDetails: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/clientCount", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },

    getpaymentdetails: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            'Content-Type': 'application/json',
            "api_key": TOKEN,
        };

        return axios.post(API_URL + "sameteam-api/stripe/admin/getPaymentDetails", payload, {
            headers: headers
        }).then((response) => {
            if (response && response.data) {
                const responses = {
                    data: response.data,
                    status: response.status
                }
                return responses
            }
        })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },


    downloadcsv: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/download", payload,{
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },

    
    edithelpandfaq: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/editFAQs", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },
    addhelpandfaq: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/addFAQs", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },


    
    deleteFAQ: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/deleteFAQs", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },


    getallfaq: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/getAllFAQs", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },



    getadmin: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            'Content-Type': 'application/json',
            "api_key": TOKEN,
        };

        return axios.post(API_URL + "sameteam-api/admin/list", payload, {
            headers: headers
        }).then((response) => {
            if (response && response.data) {
                const responses = {
                    data: response.data,
                    status: response.status
                }
                return responses
            }
        })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },


    

    getallplans: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            'Content-Type': 'application/json',
            "api_key": TOKEN,
        };

        return axios.post(API_URL + "sameteam-api/price-and-plan/get", payload, {
            headers: headers
        }).then((response) => {
            if (response && response.data) {
                const responses = {
                    data: response.data,
                    status: response.status
                }
                return responses
            }
        })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },

    
    getclients: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            'Content-Type': 'application/json',
            "api_key": TOKEN,
        };

        return axios.post(API_URL + "sameteam-api/admin/get-companies", payload, {
            headers: headers
        }).then((response) => {
            if (response && response.data) {
                const responses = {
                    data: response.data,
                    status: response.status
                }
                return responses
            }
        })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },

    

    getcompanybyid: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/get-company", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },




    fortgotpassword: function (payload) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
        return axios.post(API_URL + "sameteam-api/admin/forgot-password", payload, {
            headers: headers,
        })
            .then(response => {
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },



    resetpassword: function (payload) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
        return axios.post(API_URL + "sameteam-api/admin/reset-password", payload, {
            headers: headers,
        })
            .then(response => {
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },



    //Edit Profile Picture
    updateProfile: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/edit-company-profile-pic", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error
            });
    },




    getcountry: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/countries", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response;
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },


    getstatelist: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/states", payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response;
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },

    addcompany: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/add-company", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },
    
    companydelete: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/delete-company", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },

    
        
    superadmindelete: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/delete", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },

    

    deleteplan: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/price-and-plan/delete", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },

    dashboard: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/dashBoard",payload, {
            headers: headers
        })
            .then(response => {
                if (response && response.data) {
                    return response;
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data)
                    throw error.response.data
            });
    },
    
    

    editsuperadmin: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/update", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },
    
    getCompanybyid: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/get", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },

    
    
    getAppContent: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/get-content",payload,{
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },

    
    setAppContent: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/update-content", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },

    
    activeStatusApi: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/edit-company-status", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },

    getRefreshToken: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            //"api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/refresh-token", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },

    
    fetchReport: async function (payload) {
        let TOKEN;
        await LocalStorage.getItem("Super_Admin_token")
            .then(function (result) {
                TOKEN = result;
            });
        const headers = {
            "Content-Type": "application/json",
            "api_key": TOKEN
        };
        return axios.post(API_URL + "sameteam-api/admin/report", payload, {
            headers: headers
        })
            .then(response => {
                if (response) {
                    return response;
                }
            })
            .catch(error => {
                if (error)
                    throw error;
            });
    },



}
export default ApiUtils;