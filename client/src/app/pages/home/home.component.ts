import { Component } from '@angular/core'; // Removed AfterViewInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// NG-ZORRO Modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

// New: MapComponent
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzCardModule,
    NzCheckboxModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzPageHeaderModule,
    MapComponent // Added MapComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { // Removed implements AfterViewInit
  // Data for the form controls
  dataLayers = [
    { label: 'School Zones', value: 'school-zones', checked: true },
    { label: 'Demographics', value: 'demographics', checked: false },
    { label: 'Community Resources', value: 'community-resources', checked: false },
    { label: 'Socio-political Data', value: 'socio-political', checked: false },
    { label: 'Community Narratives', value: 'community-narratives', checked: false },
  ];

  constructor() {}
}
