import { library, config} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCaretDown,
  faFileImage
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBell,
  faCaretDown,
  faFileImage
);

config.autoAddCss = false;
