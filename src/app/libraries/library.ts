export abstract class Library {

  public static fact(n: number): number {
    if (n === 0)
      { return 1; }
    else
      { return n * Library.fact( n - 1 ); }
  }

  public static clone(toClone: any): any {
    return JSON.parse(JSON.stringify(toClone));
  }

  public static compare(obj1:any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
