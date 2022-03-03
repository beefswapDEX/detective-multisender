import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AddressPipe } from './pipes/address-format/address.pipe';

@NgModule({
  declarations: [
    AddressPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule
  ],
  exports: [
    AddressPipe
  ]
})
export class SharedModule { }
