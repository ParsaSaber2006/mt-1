import { createPageBuilder, defineComponent } from "./vuetify-elementor";

import Heading from "@/plugins/elementor-components/Heading";
import Category from "@/plugins/elementor-components/Category";
import AdvisorsSliderGroup from "@/plugins/elementor-components/AdvisorsSliderGroup";
import AdvisorsSlides from "@/plugins/elementor-components/AdvisorsSlides";
import Categories from "@/plugins/elementor-components/Categories";
import CategoriesSubset from "@/plugins/elementor-components/CategoriesSubset";
import Text from "@/plugins/elementor-components/Text";
import Image from "@/plugins/elementor-components/Image";
import Button from "@/plugins/elementor-components/Button";
import Icon from "@/plugins/elementor-components/Icon";
import LinksList from "@/plugins/elementor-components/LinksList";
import ImageSlider from "@/plugins/elementor-components/ImageSlider";
import AdvisorCard from "@/plugins/elementor-components/AdvisorCard";
import AdvisorsList from "@/plugins/elementor-components/AdvisorsList";
import CallToAction from "@/plugins/elementor-components/CallToAction";
import ContactForm from "@/plugins/elementor-components/ContactForm";
import BlogPosts from "@/plugins/elementor-components/BlogPosts";
import InnerSection from "@/plugins/vuetify-elementor/Components/Builder/Components/InnerSection";
import Divider from "@/plugins/elementor-components/Divider";
import PanelExtension from "@/plugins/elementor-components/PanelExtension";
import Carousel from "@/plugins/elementor-components/Carousel";
import Slider from "@/plugins/elementor-components/Slider";
import Html from "@/plugins/elementor-components/Html";
import Stepper from "@/plugins/elementor-components/Stepper";
import Aparat from "@/plugins/elementor-components/Aparat";
import CollaborateTool from "@/plugins/elementor-components/CollaborateTool";

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  // اول خود PageBuilder را ثبت کن
  app.use(createPageBuilder);

  // لیست تمام کامپوننت‌ها
  const components = [
    InnerSection,
    Heading,
    AdvisorsSlides,
    AdvisorsSliderGroup,
    Category,
    Categories,
    CategoriesSubset,
    Text,
    Button,
    Icon,
    Image,
    LinksList,
    ImageSlider,
    AdvisorCard,
    AdvisorsList,
    CallToAction,
    ContactForm,
    BlogPosts,
    Divider,
    PanelExtension,
    Carousel,
    Slider,
    Html,
    Stepper,
    Aparat,
    CollaborateTool,
  ];

  // 🔹 راه‌حل امن: فقط بعد از اینکه اپ کامل لود شد
  nuxtApp.hooks.hook("app:mounted", () => {
    components.forEach((c) => defineComponent(c));
  });
});
