
import CallsReport from "./calls/CallsReport.vue";
import CallStatusIcon from "./calls/CallStatusIcon.vue";

import Login from "./login/Login.vue";

import Card from "./appComponents/Card.vue";
import AppProgress from "./appComponents/AppProgress.vue";
import LoadingWait from "./appComponents/LoadingWait.vue";
import BreadcrumbsAuto from "./appComponents/BreadcrumbsAuto.vue";
import Breadcrumbs from "./appComponents/Breadcrumbs.vue";
import ShareRibbon from "./appComponents/ShareRibbon.vue";
import InfoBox from "./appComponents/InfoBox.vue";
import RenderHook from "./appComponents/RenderHook.vue";
import NumberAnimate from "./appComponents/NumberAnimate.vue";

import CategoriesList from "./entities/CategoriesList.vue";
import CategoriesBox from "./entities/CategoriesBox.vue";
import AdvisorsList from "./entities/AdvisorsList.vue";
import BlogsList from "./entities/BlogsList.vue";
import AdvisorSelect from "./entities/AdvisorSelect.vue";

import MediaBrowser from "./MediaBrowser/MediaBrowser.vue";

import Schedules from "./schedules/SchedulesEditor.vue";

import TextEditor from "./appComponents/TextEditor.vue";

const components = [
    CallsReport,
    CallStatusIcon,
    Login,

    Card,
    AppProgress,
    LoadingWait,
    BreadcrumbsAuto,
    Breadcrumbs,
    ShareRibbon,
    InfoBox,
    TextEditor,
    RenderHook,
    NumberAnimate,

    AdvisorsList,
    AdvisorSelect,
    CategoriesList,
    CategoriesBox,
    BlogsList,
    
    MediaBrowser,

    Schedules,
]
async function discoverComponents(app) {

    components.forEach((component)=>{
        app.component(component.name, component)
    })
   
    /*  const components = import.meta.globEager('./*.vue')
     Object.entries(components).forEach(([path, definition]) => {
         const componentName = path.split('/').pop().replace(/\.\w+$/, '')
         app.component(componentName, definition.default)
     }) */
}

export default discoverComponents;