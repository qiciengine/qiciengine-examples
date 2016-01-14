/**
 * @author wudm
 * copyright 2015 Qcplay All Rights Reserved.
 */
var SourcesUtil = qc.demo.SourcesUtil = {};

/**
 * 查找所有可以被消灭的格子
 * @param sourceTable
 * @param w
 * @param h
 * @param limit
 * @returns {Array}
 */
SourcesUtil.findResult = function(sourceTable, w, h, limit) {
    var list;
    var table = [];
    var i, j, k;
    var head, tail;
    var count, lastType, type;
    var slot;
    var xi, xj, yi, yj, yslot;
    var output = [], singleOutput;
    w = w || 8;
    h = h || 8;
    limit = limit || 3;

    var hash = function(i, j) { return i * w + j; };

    for (i = 0; i < h; i++) {
        table.push([]);
        for (j = 0; j < w; j++) {
            table[i].push({
                type: sourceTable[hash(i, j)]
            });
        }
    }

    // 横向统计
    for (i = 0; i < h; i++) {
        lastType = -1;
        for (j = 0; j <= w; j++) {
            slot = table[i][j] || {};
            type = slot.type;
            if (type !== lastType) {
                // 向前找所有跟我一样的 slot，记录横向数量
                for (k = j - 1; k >= 0; k--) {
                    if (table[i][k].type === lastType)
                        table[i][k].hc = count;
                    else
                        break;
                }
                count = 1;
                lastType = type;
            }
            else count++;
        }
    }

    // 纵向统计
    for (j = 0; j < w; j++) {
        lastType = -1;
        for (i = 0; i <= h; i++) {
            slot = (i == h ? {} : table[i][j]);
            type = slot.type;
            if (type !== lastType) {
                // 向上找所有跟我一样的 slot，记录纵向数量
                for (k = i - 1; k >= 0; k--) {
                    if (table[k][j].type === lastType)
                        table[k][j].vc = count;
                    else
                        break;
                }
                count = 1;
                lastType = type;
            }
            else count++;
        }
    }

    // 来一次广度优先吧
    for (i = 0; i < h; i++) {
        for (j = 0; j < w; j++) {
            // seek for next blank slot
            slot = table[i][j];
            if (slot.hc < limit && slot.vc < limit) continue;
            if (slot.visited) continue;

            // new begin slot
            list = [];
            singleOutput = [hash(i, j)];

            list.push([i, j]);
            slot.visited = true;
            head = 0;
            tail = 1;
            type = slot.type;

            while (head < tail) {
                xi = list[head][0];
                xj = list[head][1];
                head++;

                // 四方查找
                [
                    [-1, 0],  // 上
                    [1, 0],  // 下
                    [0, -1],  // 左
                    [0, 1]  // 右
                ].forEach(function(direction) {
                        yi = xi + direction[0];
                        yj = xj + direction[1];

                        if (!table[yi]) return;
                        if (!(yslot = table[yi][yj])) return;

                        if (yslot.visited ||
                            yslot.type !== type ||
                            (yslot.hc < limit && yslot.vc < limit))
                            return;

                        list.push([yi, yj]);
                        tail++;
                        yslot.visited = true;

                        singleOutput.push(hash(yi, yj));
                    });
            }

            output.push(singleOutput);
        }
    }

    return output;
};