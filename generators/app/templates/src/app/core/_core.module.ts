import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
<% if (props.ui === 'bootstrap') { -%>
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<% } else if (props.ui === 'material') { -%>
import { FlexLayoutModule } from '@angular/flex-layout';
<% } else if (props.ui === 'ionic') { -%>
import { IonicModule } from 'ionic-angular';
<% } -%>

<% if (props.ui === 'material') { -%>
import { MaterialModule } from '../material.module';
<% } -%>
import { ShellComponent } from './shell/shell.component';
<% if (props.ui === 'bootstrap' || (props.ui === 'material' && props.layout === 'simple')) { -%>
import { HeaderComponent } from './shell/header/header.component';
<% } -%>
import { RouteReusableStrategy } from './route-reusable-strategy';
<% if (props.auth) { -%>
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
<% } -%>
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';

export function createHttpService(backend: ConnectionBackend,
                                  defaultOptions: RequestOptions,
                                  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule,
<% if (props.ui === 'bootstrap') { -%>
    NgbModule,
<% } else if (props.ui === 'material') { -%>
    FlexLayoutModule,
    MaterialModule,
<% } else if (props.ui === 'ionic') { -%>
    IonicModule,
<% } -%>
    RouterModule
  ],
<% if (props.ui === 'ionic') { -%>
  entryComponents: [
    ShellComponent
  ],
<% } -%>
  declarations: [
<% if (props.ui === 'bootstrap' || (props.ui === 'material' && props.layout === 'simple')) { -%>
    HeaderComponent,
<% } -%>
    ShellComponent
  ],
  providers: [
<% if (props.auth) { -%>
    AuthenticationService,
    AuthenticationGuard,
<% } -%>
    I18nService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
