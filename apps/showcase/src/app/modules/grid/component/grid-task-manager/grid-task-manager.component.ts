import {Component} from '@angular/core';

@Component({
	selector:  'app-grid-task-manager',
	templateUrl:  './grid-task-manager.component.html',
	styleUrls:  ['./grid-task-manager.component.scss']
})
export class GridTaskManagerComponent {
	public tasks = {
		rows: [
			{
				id: 236955,
				taskNumber: 18266,
				comment: 'Task - by CN',
				userSelectedCol0: 'general',
				userSelectedCol1: '30/09/2019 04:31 PM',
				updatedTime: '19h 29m',
				dueDate: '',
				status: 'Ready',
				userSelectedCol2: '12/09/2028 09:00 PM',
				userSelectedCol3: 'SYS_ADMIN',
				userSelectedCol4: '24/09/2019 03:57 PM',
				score: 614,
				taskStatus: 'task_ready',
				dueClass: '',
				assetEntityId: 147814,
				assetEntityAssetType: 'Appliance',
				assetEntityAssetClass: 'DEVICE',
				instructionsLinkURL: null,
				estStartClass: null,
				estFinishClass: null,
				isPublished: true,
				updatedClass: '',
			},
			{
				id: 236975,
				taskNumber: 18286,
				comment: '4 am',
				userSelectedCol0: 'general',
				userSelectedCol1: '30/09/2019 04:29 PM',
				updatedTime: '19h 31m',
				dueDate: '',
				status: 'Started',
				userSelectedCol2: '13/09/2028 09:45 PM',
				userSelectedCol3: '',
				userSelectedCol4: '30/09/2019 04:07 PM',
				nGraphUrl: 0,
				score: 714,
				taskStatus: 'task_started',
				dueClass: '',
				assetEntityId: null,
				assetEntityAssetType: null,
				assetEntityAssetClass: null,
				instructionsLinkURL: null,
				estStartClass: null,
				estFinishClass: null,
				isPublished: true,
				updatedClass: 'task_late'
			},
			{
				id: 236979,
				taskNumber: 18289,
				comment: '5 am',
				userSelectedCol0: 'general',
				userSelectedCol1: '29/09/2019 04:29 PM',
				updatedTime: '18h 31m',
				dueDate: '',
				status: 'Started',
				userSelectedCol2: '13/09/2028 09:45 PM',
				userSelectedCol3: '',
				userSelectedCol4: '30/09/2019 04:07 PM',
				nGraphUrl: 0,
				score: 714,
				taskStatus: 'task_started',
				dueClass: '',
				assetEntityId: null,
				assetEntityAssetType: null,
				assetEntityAssetClass: null,
				instructionsLinkURL: null,
				estStartClass: null,
				estFinishClass: null,
				isPublished: true,
				updatedClass: 'task_late'
			}
		],
		totalCount: 2,
	};

	constructor() {
		//
	}
}
