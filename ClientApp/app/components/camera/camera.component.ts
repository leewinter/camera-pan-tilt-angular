import { Component } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import { Subject } from 'rxjs';

export class TableCol {
    public Text: string;
    public X: number;
    public Y: number;
}

export class TableRow {
    public Cols: Array<TableCol>;
}

@Component({
    selector: 'camera',
    providers: [CameraService],
    templateUrl: './camera.component.html'
})
export class CameraComponent {
    private gridSize: number = 100;
    private interval: any;
    private timeout: any;
    private duplicateCellCall: number = 0;
    private lastCell: TableCol;

    constructor(private _cameraService: CameraService) {

    }

    public rows: Array<TableRow> = new Array<TableRow>();

    ngOnInit() {
        this.createGrid();
    }

    public createGrid() {
        for (var y = 0; y < this.gridSize; y++) {
            let thisRow = new TableRow();
            thisRow.Cols = this.getCols(y);
            this.rows.push(thisRow);
        }
    }

    private postCoordinates(cell: TableCol) {
        this._cameraService.post("api/camera", this.lastCell).subscribe((response) => {
            //console.log(response);            
        });
    }

    private mouseOverCell(cell: TableCol) {
        this.lastCell = cell;
        this.postCoordinates(this.lastCell);
    }

    private getCols(y: number): Array<TableCol> {
        let columns: Array<TableCol> = new Array<TableCol>();
        for (var x = 0; x < this.gridSize; x++) {
            let thisCol = new TableCol();
            thisCol.Y = y;
            thisCol.X = x;
            columns.push(thisCol);
        }
        return columns;
    }
}
