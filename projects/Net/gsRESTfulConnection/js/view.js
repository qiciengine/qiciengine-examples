/**
 * @author wangyl
 * copyright 2015 Qcplay All Rights Reserved.
 */

var dataModel = new qc.widget.DataModel();

function createData(name) {
    var data = new qc.widget.Data({name : name});
    data.a('delete', 'delete');
    dataModel.add(data);
}

function initView() {
    panel = new qc.widget.Panel({ titleVisible : false, contentPadding : 10 });
    panel.content = '<p>Name: </p><p>score: </p><p>msg: </p>';

    var tablePane = new qc.widget.TablePane(dataModel),
        table = tablePane.getTable();

    table.addColumns([
        {
            name : 'name',
            displayName : 'UserName',
            align : 'center'
        },
        {
            name : 'delete',
            displayName : 'Delete?',
            accessType : 'attr',
            align : 'center',
            renderer : new qc.widget.renderer.Renderer({
                draw : function(g, value, x, y, width, height) {
                    var div = document.createElement('div');
                    div.style.width = width + 'px';
                    var a = document.createElement('a');
                    div.style.textAlign = 'center';
                    a.href = '#';
                    div.innerHTML = 'delete';
                    a.appendChild(div);
                    return a;
                }
            })
        }
    ]);

    table.onDataClick = function(data, e) {
        var column = table.getColumnAt(e);
        if (column && column.name === 'delete') {
            del(data.name, function() {
                dataModel.remove(data);
            });
        }
        else {
            query(data.name);
        }
    };

    var addContainer = new qc.widget.Container();
    addContainer.layout = new qc.widget.layout.TableLayout(addContainer);

    var userNameField = new qc.widget.TextField(),
        scoreField = new qc.widget.TextField(),
        addBtn = new qc.widget.Button({ text : 'Add User' });

    addBtn.on('click', function() {
        var name = userNameField.value;
        add(name, scoreField.value, function(data) {
            console.log('add', data);
            if (data.new) createData(name);
            else query(name);
        });
    });
    addContainer.setItems([
        {
            height : 30,
            widths : [90, 0.2],
            cells : [
                {
                    element : new qc.widget.Label({text : 'UserName : ', align : 'right' })
                },
                {
                    element : userNameField
                }
            ]
        },
        {
            height : 30,
            cells : [
                {
                    element : new qc.widget.Label({ text : 'Score : ', align : 'right' })
                },
                {
                    element : scoreField
                }
            ]
        },
        {
            height : 30,
            cells : [
                {
                    colspan : 2,
                    element : addBtn
                }
            ]
        }
    ]);

    var container = new qc.widget.Container();
    container.layout = new qc.widget.layout.TableLayout(container);

    container.setItems([
        {
            height : "100+0.1",
            widths : ["100+0.1", 0.2],
            cells : [
                {
                    element : panel,
                    rowspan : 2
                },
                {
                    element : tablePane
                }
            ]
        },
        {
            height : 100,
            cells : [
                {
                    element : addContainer
                }
            ]
        }
    ]);

    container.addToDOM();

    list();
}