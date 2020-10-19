import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { LayoutComponent } from './layout/pages/layout/layout.component';
import { FooterComponent } from './layout/pages/footer/footer.component';
import { ErrorComponent } from './layout/pages/error/error.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FirebaseModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
