import {DialogModel} from './dialog.model';
import {DynamicHostComponent} from '../component/dynamic-host/dynamic-host.component';

/**
 * Dialog Host Model
 */
export class DynamicHostModel {
	public dynamicHostComponent?: DynamicHostComponent;
	public dialogModel?: DialogModel;
	public instantiated: boolean;
}
