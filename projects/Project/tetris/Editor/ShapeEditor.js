G.extend.menu('Test/Shape', function() {
    var game = G.game;
    game.assets.load('Assets/prefabs/Shape.bin', function(prefab) {
        var shape = game.add.clone(prefab, game.world.find('UIRoot/pool'));
        var c = shape.getScript('qc.tetris.ShapeUI');

        c.data = qc.Tetris.Shapes.random();
    });

});