export class MathUtils {

	public static randomMinMax(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	/**
	 * https://www.desmos.com/calculator/lac2i0bgum
	 * y = a*x*x +b*x +c;
	 * @param p1
	 * @param p2
	 * @param p3
	 */
	public static calculateParabola(p1: PIXI.Point, p2: PIXI.Point, p3: PIXI.Point): { a: number, b: number, c: number } {
		let A1 = - p1.x * p1.x + p2.x * p2.x;
		let B1 = - p1.x + p2.x;
		let D1 = - p1.y + p2.y;
		let A2 = - p2.x * p2.x + p3.x * p3.x;
		let B2 = - p2.x + + p3.x;
		let D2 = - p2.y + p3.y;
		let Bm = -(B2 / B1);
		let A3 = Bm * A1 + A2;
		let D3 = Bm * D1 + D2;
		let returnObj = { a: 0, b: 0, c: 0 };
		returnObj.a = D3 / A3;
		returnObj.b = (D1 - A1 * returnObj.a) / B1;
		returnObj.c = p1.y - returnObj.a * p1.x * p1.x - returnObj.b * p1.x;
		return returnObj;
	}

	public static sign(val: number): number {
		return val < 0 ? -1: 1;
	}

	/**
	 * Util for converting degrees to radians
	 */
	public static degreesToRadians(degs:number):number {
		return (degs * Math.PI) / 180;
	}

	/**
	 * Cleans a value to the desired decimal places
	 */
	public static clean(value:number, places:number = 2):number {
		let s:string = value.toFixed(places);
		return parseFloat(s);
	}

	/**
	 * returns this first number 'clamped' between the next 2
	 *
	 MathUtils.clamp( 10, 0, 5 ) )  10 is greater than 5 so returns 5
	 MathUtils.clamp( 3, 0, 5 ) )   3 is greater than 0 and less than 5, so returns 3
	 MathUtils.clamp( -1, 0, 5 ) )  -1 is less than 0, so returns 0
	 */
	public static clamp(n:number, mn:number, mx:number):number
	{
		return Math.min(Math.max(n,mn),mx);
	}

	/**
	 *	Round a floating point number to a specified number of decimal places
	 *
	 *	@param	num	the number to round
	 *	@param	places	the number of decimal places to round to
	 *	@return	a rounded number
	 */
	public static roundToPlaces(num:number,places:number):number {
		let factor:number = Math.pow(10,places);
		return Math.round (MathUtils.clean(num, places + 1) * factor)/factor;
	}

	public static ceilToPlaces(num:number,places:number):number {
		let factor:number = Math.pow(10,places);
		return Math.ceil (MathUtils.clean(num, places + 1) * factor)/factor;
	}

	public static floorToPlaces(num:number,places:number):number {
		let factor:number = Math.pow(10,places);
		return Math.floor (MathUtils.clean(num, places + 1) * factor)/factor;
	}


	/**
	 * Easy way to get a percent when you want to know:
	 *
	 * 23 is what percentage of 100?
	 */
	public static percentA(part:number, total:number, places:number=2):number {
		let percentage:number = part / total;

		if(places == -1) {
			return MathUtils.clean(percentage * 100);
		}

		return MathUtils.roundToPlaces(percentage * 100, places);
	}

	/**
	 * Easy way to get a percent when you want to know:
	 *
	 * What is 23% of 100?
	 */
	public static percentB(percent:number, total:number):number {
		percent /= 100;
		return MathUtils.clean(total * percent);
	}

	/**
	 * Easy way to get a percent when you want to know:
	 *
	 * What is 23% of what is 46?
	 */
	public static percentC(percent:number, value:number):number {
		return MathUtils.clean((value * 100) / percent);
	}
}
