var StrikeFinder = StrikeFinder || {};

StrikeFinder.TaskTableView = UAC.TableView.extend({
    initialize: function() {
        var view = this;

        view.tasks_collapsable = new UAC.CollapsableContentView({
            el: view.el,
            collapsed: false
        });

        view.options.aoColumns = [
            {sTitle: 'id', mData: 'id', bVisible: false, bSortable: true},
            {sTitle: "Description", mData: 'description', bVisible: true, bSortable: true, sWidth: '70%'},
            {sTitle: "Started", mData: 'started', bVisible: true, bSortable: true, sDefaultContent: ''},
            {sTitle: "Completed", mData: 'result.completed', bVisible: true, bSortable: true, sDefaultContent: ''},
            {sTitle: "State", mData: 'state', bVisible: true, bSortable: true}
        ];

        view.options.aaSorting = [
            [ 2, "desc" ]
        ];

        view.options.oLanguage = {
            sEmptyTable: 'No tasks were found'
        };

        view.options['aoColumnDefs'] = [
            {
                mRender: function (data, type, row) {
                    return StrikeFinder.format_unix_date(data);
                },
                aTargets: [2]
            },
            {
                mRender: function (data, type, row) {
                    return StrikeFinder.format_unix_date(data);
                },
                aTargets: [3]
            },
            {
                mRender: function (data, type, row) {
                    if (data) {
                        var label_class = '';
                        if (data == 'FAILURE') {
                            label_class = 'label-important';
                        }
                        else if (data == 'PENDING' || data == 'STARTED') {
                            label_class = 'label-default';
                        }
                        else if (data == 'SUCCESS') {
                            label_class = 'label-success';
                        }
                        else if (!data || data == 'RETRY') {
                            label_class = 'label-warning';
                        }
                        return _.sprintf('<span class="label %s error_message" style="text-align: center; width: 100%%">%s</span>', label_class, data);
                    }
                    else {
                        return '';
                    }
                },
                aTargets: [4]
            }
        ];

        view.options.sDom = 'ltip';
        view.options.iDisplayLength = 100;

        if (view.collection) {
            view.listenTo(view.collection, 'reset', view.render);
            view.listenTo(view.collection, 'reset', function() {
                var title = _.sprintf('<i class="fa fa-tasks"></i> Tasks (%s)', view.collection.length);
                view.tasks_collapsable.set('title', title);
            });
        }
    }
});

StrikeFinder.TaskAppView = UAC.View.extend({
    initialize: function() {
        var view = this;

        view.tasks = new StrikeFinder.TaskCollection();

        view.tasks_table = new StrikeFinder.TaskTableView({
            el: '#tasks-table',
            collection: view.tasks
        });

        view.tasks.reset(StrikeFinder.tasks);
    }
});