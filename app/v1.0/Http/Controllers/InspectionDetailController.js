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

/*
 |--------------------------------------------------------------------------
 | Versi 1.0.0
 |--------------------------------------------------------------------------
 */

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