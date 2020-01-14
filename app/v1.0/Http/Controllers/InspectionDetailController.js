/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
// Models
const InspectionDModel = require(_directory_base + '/app/v1.0/Http/Models/InspectionDModel.js');
// Libraries
const HelperLib = require(_directory_base + '/app/v1.0/Http/Libraries/Helper.js');
/*
 |--------------------------------------------------------------------------
 | Versi 1.0.0
 |--------------------------------------------------------------------------
 */


/** 
 	  * Create
	  * Untuk menyimpan detail inspeksi yang diinputkan melalui mobile.
	  * --------------------------------------------------------------------
	*/
exports.create = (req, res) => {
	if (!req.body.INSERT_TIME) {
		req.body.INSERT_TIME = 'now';
	}
	InspectionDModel.findOne({
		BLOCK_INSPECTION_CODE_D: req.body.BLOCK_INSPECTION_CODE_D
	})
		.then(data => {
			if (data) {
				res.send({
					status: true,
					message: 'Data duplikat',
					data: []
				})
			} else {
				const set = new InspectionDModel({
					BLOCK_INSPECTION_CODE_D: req.body.BLOCK_INSPECTION_CODE_D,
					BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
					CONTENT_INSPECTION_CODE: req.body.CONTENT_INSPECTION_CODE,
					VALUE: req.body.VALUE,
					STATUS_SYNC: req.body.STATUS_SYNC,
					SYNC_TIME: HelperLib.date_format('now', 'YYYYMMDDhhmmss'),
					INSERT_USER: req.body.INSERT_USER,
					INSERT_TIME: HelperLib.date_format(req.body.INSERT_TIME, 'YYYYMMDDhhmmss'),
					UPDATE_USER: req.body.INSERT_USER,
					UPDATE_TIME: HelperLib.date_format(req.body.INSERT_TIME, 'YYYYMMDDhhmmss'),
					DELETE_USER: "",
					DELETE_TIME: 0
				});
				set.save()
					.then(data => {
						if (!data) {
							return res.send({
								status: false,
								message: config.app.error_message.create_404,
								data: {}
							});
						}
						res.send({
							status: true,
							message: "success",
							data: []
						});
					}).catch(err => {
						res.status(500).send({
							status: false,
							message: config.app.error_message.create_500 + ' - 2',
							data: {}
						});
					});
			}
		});
};

/** 
  * Find One
* Untuk menampilkan 1 row data berdasarkan Block Inspection Detail Code.
* --------------------------------------------------------------------
*/
exports.find_one = (req, res) => {

	var auth = req.auth;
	InspectionDModel.find({
		// BLOCK_INSPECTION_CODE_D: req.params.id,
		// DELETE_USER: ""
	})
		.select({
			_id: 0,
			__v: 0
		})
		.then(data => {
			if (!data) {
				return res.send({
					status: false,
					message: config.app.error_message.find_404 + ' - 2',
					data: {}
				});
			}
			res.send({
				status: true,
				message: config.app.error_message.find_200,
				data: data
			});
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.send({
					status: false,
					message: config.app.error_message.find_404 + ' - 1',
					data: {}
				});
			}
			return res.send({
				status: false,
				message: config.app.error_message.find_500,
				data: {}
			});
		});
};