export default {
	name: "QUnit test suite for the UI5 Application: com.mycompany.newapp",
	defaults: {
		page: "ui5://test-resources/com/mycompany/newapp/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: "com/mycompany/newapp/",
			never: "test-resources/com/mycompany/newapp/"
		},
		loader: {
			paths: {
				"com/mycompany/newapp": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.mycompany.newapp"
		},
		"integration/opaTests": {
			title: "Integration tests for com.mycompany.newapp"
		}
	}
};
