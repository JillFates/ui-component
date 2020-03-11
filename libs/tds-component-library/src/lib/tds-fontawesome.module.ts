import {NgModule} from '@angular/core';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
	faAdjust, faArchive, faArrowsAltV, faBan, faBars, faBox, faBoxOpen, faBuilding,
	faCheck, faCircle,
	faCog, faCogs, faCompress,
	faCubes, faDatabase, faEdit, faExclamationTriangle, faExpand, faEye,
	faForward, faHome, faLaptop, faLayerGroup, faList,
	faListUl,
	faMinus, faPause, faPlay, faPlus, faQuestion, faQuestionCircle,
	faSearchMinus, faSearchPlus, faServer,
	faSignal,
	faSitemap, faSortAmountDown, faSpinner,
	faStream, faSyncAlt, faTabletAlt, faUndo, faUser, faWindowMaximize, faWindowMinimize
} from '@fortawesome/free-solid-svg-icons';
import {faAdn} from '@fortawesome/free-brands-svg-icons';
import {faCheckSquare, faCircleNotch, faFolder, faHourglassStart, faSquare, faThumbsUp} from '@fortawesome/pro-solid-svg-icons';
import {faShareSquare} from '@fortawesome/free-regular-svg-icons';

@NgModule({
	imports: [FontAwesomeModule],
	exports: [FontAwesomeModule]
})
export class TdsFontawesomeModule {
	constructor(iconLibrary: FaIconLibrary) {
		iconLibrary.addIcons(
			faList,
			faLayerGroup,
			faBars,
			faServer,
			faDatabase,
			faBoxOpen,
			faCircle,
			faCog,
			faCogs,
			faSpinner,
			faSortAmountDown,
			faAdjust,
			faSyncAlt,
			faSearchPlus,
			faSearchMinus,
			faCubes,
			faSitemap,
			faListUl,
			faMinus,
			faCheck,
			faForward,
			faSignal,
			faStream,
			faUser,
			faUndo,
			faEye,
			faCheck,
			faPause,
			faEdit,
			faHome,
			faBuilding,
			faPlay,
			faExpand,
			faCompress,
			faWindowMaximize,
			faWindowMinimize,
			faPlus,
			faArrowsAltV,
			faLaptop,
			faTabletAlt,
			faQuestion,
			faAdn,
			faBox,
			faCircleNotch,
			faThumbsUp,
			faHourglassStart,
			faCheckSquare,
			faSquare,
			faArchive,
			faBan,
			faExclamationTriangle,
			faQuestionCircle,
			faShareSquare,
			faFolder
		);
	}
}
