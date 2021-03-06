import { ColumnHeaderData, FilterType } from '../../../../../../../../libs/tds-component-library/src';
// isActionable: true,
export const AssetColumnsModel: Array<ColumnHeaderData> = [
	{
		columnMenu: false,
		property: 'id',
		filterable: true,
		label: 'Id',
		locked: false,
		width: 80,
		filter: null,
		type: 'text',
		filterType: FilterType.number
	},
	{
		columnMenu: false,
		property: 'assetName',
		filterable: true,
		label: 'Name',
		locked: false,
		width: 100,
		filter: null,
		type: 'text',
		filterType: FilterType.text
	},
	{
		columnMenu: false,
		property: 'comment',
		filterable: true,
		label: 'Description',
		locked: false,
		width: 250,
		filter: null,
		type: 'text',
		filterType: FilterType.text
	},
	{
		columnMenu: true,
		property: 'userSelectedCol0',
		filterable: true,
		label: 'Category',
		locked: false,
		width: 100,
		filter: null,
		type: 'text',
		filterType: FilterType.dropdown,
		dropdownData: [{ text: 'general', value: 'general' }, { text: 'Other', value: 'other' }]
	},
	{
		columnMenu: false,
		property: 'checked',
		filterable: true,
		label: 'Revised',
		locked: false,
		width: 100,
		filter: null,
		type: 'boolean',
		filterType: FilterType.boolean
	},
	{
		columnMenu: false,
		property: 'userSelectedCol1',
		filterable: true,
		label: 'Last Updated',
		locked: false,
		width: 170,
		filter: null,
		type: 'text',
		filterType: FilterType.date
	},
];
export const AssetData: Array<any> = [
	{
		id: 236955,
		assetName: 'A1 PDU A',
		comment: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		userSelectedCol0: 'general',
		userSelectedCol1: '30/09/2019 04:31 PM',
		checked: false,
	},
	{
		id: 236975,
		assetName: 'A1 PDU B',
		comment: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
		userSelectedCol0: 'general',
		userSelectedCol1: '30/09/2019 04:29 PM',
		checked: false,
	},
	{
		id: 236979,
		assetName: 'A1 PDU C',
		comment: 'cccccccccccccccccccccccc',
		userSelectedCol0: 'general',
		userSelectedCol1: '29/09/2019 04:29 PM',
		checked: false,
	},
	{
		id: 236958,
		assetName: 'A1 PDU D',
		comment: 'dddddddddddddddddddddddddddd',
		userSelectedCol0: 'general',
		userSelectedCol1: '30/09/2019 04:31 PM',
		checked: false,
	},
	{
		id: 236978,
		assetName: 'A1 PDU E',
		comment: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
		userSelectedCol0: 'general',
		userSelectedCol1: '30/09/2019 04:29 PM',
		checked: false,
	},
	{
		id: 236980,
		assetName: 'A1 PDU F',
		comment: 'ffffffffffffffffffffffffffffffffff',
		userSelectedCol0: 'general',
		userSelectedCol1: '29/09/2019 04:29 PM',
		checked: false,
	},
	{
		id: 236963,
		assetName: 'A1 PDU G',
		comment: 'gggggggggggggggggggggggggggggggggg',
		userSelectedCol0: 'general',
		userSelectedCol1: '30/09/2019 04:31 PM',
		checked: false,
	},
	{
		id: 236974,
		assetName: 'A1 PDU H',
		comment: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
		userSelectedCol0: 'general',
		userSelectedCol1: '30/09/2019 04:29 PM',
		checked: false,
	}
];
