import "./main.css";
import { CSSPlugin, gsap } from "gsap";

import WebApp from "@components/web-app/web-app";
import WebMenu from "@components/web-menu/web-menu";
import WebActivityList from "@components/web-activity-list/web-activity-list";
import WebActivity from "@components/web-activity/web-activity";

customElements.define("web-app", WebApp, { extends: "main" });
customElements.define("web-menu", WebMenu, { extends: "header" });
customElements.define("web-activity-list", WebActivityList, { extends: "ul" });
customElements.define("web-activity", WebActivity, { extends: "li" });

gsap.registerPlugin(CSSPlugin);
