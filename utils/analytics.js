import ReactGA from 'react-ga';

export const InitGA = () => {
    console.log('GA init')
    ReactGA.initialize('UA-152856412-1')
}

export const logPageView = () => {
    ReactGA.set({page: window.location.pathname})
    ReactGA.pageview(window.location.pathname)
}

export const LogEvent = (category = '', action = '',label='') => {
    if(category && action && label){
        ReactGA.event({category,action, label})
    }
}

export const logExpception = (description='', fatal = 'false') => {
    if(description){
        ReactGA.exception({description,fatal})
    }
} 

{/**

if(!window.GA_INITIALIZED) {
    initGA()
    window.GA_INITIALIZED = true
    }
    logPageView()
}


*/}