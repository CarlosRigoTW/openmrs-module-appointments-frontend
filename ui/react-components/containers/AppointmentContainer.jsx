import React, {Component} from "react";
import AddAppointment from "../components/AddAppointment/AddAppointment.jsx";
import {IntlProvider} from "react-intl";
import {getLocale} from "../utils/LocalStorageUtil";
import {getTranslations} from "../api/translationsApi";
import {getAppConfigs} from "../api/configApi";
import translations from '../../app/i18n/appointments';
import {appName} from '../constants';
import PropTypes from "prop-types";
import {AppContext} from "../components/AppContext/AppContext";
import moment from "moment";

// TODO : need to add connection to redux

class AppointmentContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            locale: getLocale(),
            messages: translations[props.locale],
            appConfigs: null
        };
        (async () => {
            await this.getMessages();
            await this.getAppConfigs();
        })();
        moment.locale(getLocale());
    }

    async getMessages () {
        const messages = await getTranslations({appName: appName, locale: this.state.locale});
        this.setState({messages: messages});
    }

    async getAppConfigs () {
        const appConfigs = await getAppConfigs({appName: appName});
        const {config} = appConfigs;
        this.setState({appConfigs: config});
    }

    render () {
        const {locale, messages, appConfigs} = this.state;
        return (
            <AppContext.Provider value={{onBack: this.props.onBack, setViewDate: this.props.setViewDate}}>
                <IntlProvider defaultLocale='en' locale={locale} messages={messages}>
                    <AddAppointment appConfig={appConfigs}/>
                </IntlProvider>
            </AppContext.Provider>);
    }
}

AppointmentContainer .propTypes = {
    onBack: PropTypes.func.isRequired,
    setViewDate: PropTypes.func.isRequired
};

export default AppointmentContainer;