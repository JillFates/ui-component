import {NgModule} from '@angular/core';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
	faAdjust, faBars, faBoxOpen, faBuilding,
	faCheck, faCircle,
	faCog, faCogs,
	faCubes, faDatabase, faEdit, faEye,
	faForward, faHome, faLayerGroup, faList,
	faListUl,
	faMinus, faPause, faPlay,
	faSearchMinus, faSearchPlus, faServer,
	faSignal,
	faSitemap, faSortAmountDown, faSpinner,
	faStream, faSyncAlt, faUndo, faUser
} from '@fortawesome/free-solid-svg-icons';

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
			faPlay
		);
	}
}
