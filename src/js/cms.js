import CMS from "netlify-cms";
import FoodPreview from "./cms/food-preview";
import DrinkPreview from "./cms/drink-preview";
import GalleryPreview from "./cms/gallery-preview";
import LinksControl from "../js/cms/list-widget";

CMS.registerWidget("links", LinksControl)
CMS.registerPreviewStyle("../css/main.css");
CMS.registerPreviewTemplate("food", FoodPreview);
CMS.registerPreviewTemplate("drinks", DrinkPreview);
CMS.registerPreviewTemplate("gallery", GalleryPreview);
