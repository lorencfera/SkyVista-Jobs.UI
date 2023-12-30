import { HttpInterceptor } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })

  export class LoadingService {
    loadingEmit: EventEmitter<any> = new EventEmitter<string>()
    loadingBol: Map<string, boolean>  = new Map<string, boolean>()
    constructor(){}

    setLoading(loading: boolean, url: string): void { 
        if(loading) {
            this.loadingBol.set(url, loading)
            this.loadingEmit.emit(true)
        }else if(!loading && this.loadingBol.has(url)) { 
            this.loadingBol.delete(url)
        }

        if(this.loadingBol.size === 0) { 
            this.loadingEmit.emit(false)
        }
    }
  }