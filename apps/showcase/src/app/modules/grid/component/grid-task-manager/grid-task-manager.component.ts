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
				id:  229997,
				taskNumber: 11406,
				comment: 'TestAPI2 v',
				userSelectedCol0: 'general',
				userSelectedCol1: '09/27/2019 07: 51 PM',
				updatedTime: '23d 1h',
				dueDate: '',
				status: 'Completed',
				userSelectedCol2: 'TDS Admin',
				userSelectedCol3: 'SYS_ADMIN',
				userSelectedCol4: 'moveday',
				score: 211,
				taskStatus: 'task_completed',
				dueClass: '',
				assetEntityid:  null,
				assetEntityAssetType: null,
				assetEntityAssetClass: null,
				instructionsLinkURL: null,
				estStartClass: '',
				estFinishClass: '',
				isPublished: true,
				updatedClass: ''
			},
			{
				id:  230001,
				taskNumber: 11410,
				comment: '9380 Task 1',
				userSelectedCol0: 'general',
				userSelectedCol1: '03/07/2018 09: 08 AM',
				updatedTime: '1y 204d 11h',
				dueDate: '08/03/2018',
				status: 'Completed',
				userSelectedCol2: '',
				userSelectedCol3: '',
				userSelectedCol4: 'general',
				score: 215,
				taskStatus: 'task_completed',
				dueClass: 'task_overdue',
				assetEntityid:  113902,
				assetEntityAssetType: 'Network',
				assetEntityAssetClass: 'DEVICE',
				instructionsLinkURL: null,
				estStartClass: '',
				estFinishClass: '',
				isPublished: true,
				updatedClass: ''
			}
		],
		totalCount: 2
	};
	public data:  any = [
		{
			name:  'Task 1',
			role:  'FE Team'
		},
		{
			name:  'Task 2',
			role:  'FE Team'
		}
	];

	constructor() {
		//
	}
}
