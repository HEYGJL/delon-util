import extend from 'extend';
/**
 * Gets the value at `path` of `object`, like `_.get` in lodash.
 *
 * 类似 `_.get`，根据 `path` 获取安全值
 */
export function deepGet(obj, path, defaultValue) {
    if (!obj || path == null || path.length === 0)
        return defaultValue;
    if (!Array.isArray(path)) {
        path = ~path.indexOf('.') ? path.split('.') : [path];
    }
    if (path.length === 1) {
        const checkObj = obj[path[0]];
        return typeof checkObj === 'undefined' ? defaultValue : checkObj;
    }
    const res = path.reduce((o, k) => (o || {})[k], obj);
    return typeof res === 'undefined' ? defaultValue : res;
}
/**
 * Base on [extend](https://github.com/justmoon/node-extend) deep copy.
 *
 * 基于 [extend](https://github.com/justmoon/node-extend) 的深度拷贝
 */
export function deepCopy(obj) {
    const result = extend(true, {}, { _: obj });
    return result._;
}
/**
 * Deep merge object.
 *
 * 深度合并对象
 *
 * @param original 原始对象
 * @param arrayProcessMethod 数组处理方式
 *  - `true` 表示替换新值，不管新值为哪种类型
 *  - `false` 表示会合并整个数组（将旧数据与新数据合并成新数组）
 * @param objects 要合并的对象
 */
export function deepMergeKey(original, arrayProcessMethod, ...objects) {
    if (Array.isArray(original) || typeof original !== 'object')
        return original;
    const isObject = (v) => typeof v === 'object' || typeof v === 'function';
    const merge = (target, obj) => {
        Object.keys(obj)
            .filter(key => key !== '__proto__' && Object.prototype.hasOwnProperty.call(obj, key))
            .forEach(key => {
            const fromValue = obj[key];
            const toValue = target[key];
            if (Array.isArray(toValue)) {
                target[key] = arrayProcessMethod ? fromValue : [...toValue, ...fromValue];
            }
            else if (fromValue != null && isObject(fromValue) && toValue != null && isObject(toValue)) {
                target[key] = merge(toValue, fromValue);
            }
            else {
                target[key] = deepCopy(fromValue);
            }
        });
        return target;
    };
    objects.filter(v => v != null && isObject(v)).forEach(v => merge(original, v));
    return original;
}
/**
 * Deep merge object.
 *
 * 深度合并对象
 */
export function deepMerge(original, ...objects) {
    return deepMergeKey(original, false, ...objects);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3V0aWwvb3RoZXIvZGVlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUI7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxPQUFPLENBQUMsR0FBUSxFQUFFLElBQTBDLEVBQUUsWUFBa0I7SUFDOUYsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUFFLE9BQU8sWUFBWSxDQUFDO0lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEQ7SUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixPQUFPLE9BQU8sUUFBUSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7S0FDbEU7SUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckQsT0FBTyxPQUFPLEdBQUcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3pELENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FBeUIsR0FBeUI7SUFDeEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1QyxPQUFPLE1BQU0sQ0FBQyxDQUFNLENBQUM7QUFDdkIsQ0FBQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLFFBQWEsRUFBRSxrQkFBMkIsRUFBRSxHQUFHLE9BQWM7SUFDeEYsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7UUFBRSxPQUFPLFFBQVEsQ0FBQztJQUU3RSxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsQ0FBQztJQUU5RSxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQVcsRUFBRSxHQUFRLEVBQUUsRUFBRTtRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQzthQUMzRTtpQkFBTSxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMzRixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUM7SUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0UsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsU0FBUyxDQUFDLFFBQWEsRUFBRSxHQUFHLE9BQWM7SUFDeEQsT0FBTyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLCBsaWtlIGBfLmdldGAgaW4gbG9kYXNoLlxuICpcbiAqIOexu+S8vCBgXy5nZXRg77yM5qC55o2uIGBwYXRoYCDojrflj5blronlhajlgLxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBHZXQob2JqOiBhbnksIHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCB8IHVuZGVmaW5lZCwgZGVmYXVsdFZhbHVlPzogYW55KTogYW55IHtcbiAgaWYgKCFvYmogfHwgcGF0aCA9PSBudWxsIHx8IHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICBpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpIHtcbiAgICBwYXRoID0gfnBhdGguaW5kZXhPZignLicpID8gcGF0aC5zcGxpdCgnLicpIDogW3BhdGhdO1xuICB9XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IGNoZWNrT2JqID0gb2JqW3BhdGhbMF1dO1xuICAgIHJldHVybiB0eXBlb2YgY2hlY2tPYmogPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdFZhbHVlIDogY2hlY2tPYmo7XG4gIH1cbiAgY29uc3QgcmVzID0gcGF0aC5yZWR1Y2UoKG8sIGspID0+IChvIHx8IHt9KVtrXSwgb2JqKTtcbiAgcmV0dXJuIHR5cGVvZiByZXMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdFZhbHVlIDogcmVzO1xufVxuXG4vKipcbiAqIEJhc2Ugb24gW2V4dGVuZF0oaHR0cHM6Ly9naXRodWIuY29tL2p1c3Rtb29uL25vZGUtZXh0ZW5kKSBkZWVwIGNvcHkuXG4gKlxuICog5Z+65LqOIFtleHRlbmRdKGh0dHBzOi8vZ2l0aHViLmNvbS9qdXN0bW9vbi9ub2RlLWV4dGVuZCkg55qE5rex5bqm5ou36LSdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwQ29weTxUIGV4dGVuZHMgb2JqZWN0ID0gYW55PihvYmo6IFQgfCBudWxsIHwgdW5kZWZpbmVkKTogVCB7XG4gIGNvbnN0IHJlc3VsdCA9IGV4dGVuZCh0cnVlLCB7fSwgeyBfOiBvYmogfSk7XG4gIHJldHVybiByZXN1bHQuXyBhcyBUO1xufVxuXG4vKipcbiAqIERlZXAgbWVyZ2Ugb2JqZWN0LlxuICpcbiAqIOa3seW6puWQiOW5tuWvueixoVxuICpcbiAqIEBwYXJhbSBvcmlnaW5hbCDljp/lp4vlr7nosaFcbiAqIEBwYXJhbSBhcnJheVByb2Nlc3NNZXRob2Qg5pWw57uE5aSE55CG5pa55byPXG4gKiAgLSBgdHJ1ZWAg6KGo56S65pu/5o2i5paw5YC877yM5LiN566h5paw5YC85Li65ZOq56eN57G75Z6LXG4gKiAgLSBgZmFsc2VgIOihqOekuuS8muWQiOW5tuaVtOS4quaVsOe7hO+8iOWwhuaXp+aVsOaNruS4juaWsOaVsOaNruWQiOW5tuaIkOaWsOaVsOe7hO+8iVxuICogQHBhcmFtIG9iamVjdHMg6KaB5ZCI5bm255qE5a+56LGhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2VLZXkob3JpZ2luYWw6IGFueSwgYXJyYXlQcm9jZXNzTWV0aG9kOiBib29sZWFuLCAuLi5vYmplY3RzOiBhbnlbXSk6IGFueSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9yaWdpbmFsKSB8fCB0eXBlb2Ygb3JpZ2luYWwgIT09ICdvYmplY3QnKSByZXR1cm4gb3JpZ2luYWw7XG5cbiAgY29uc3QgaXNPYmplY3QgPSAodjogYW55KSA9PiB0eXBlb2YgdiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHYgPT09ICdmdW5jdGlvbic7XG5cbiAgY29uc3QgbWVyZ2UgPSAodGFyZ2V0OiBhbnksIG9iajogYW55KSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKVxuICAgICAgLmZpbHRlcihrZXkgPT4ga2V5ICE9PSAnX19wcm90b19fJyAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKVxuICAgICAgLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgZnJvbVZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIGNvbnN0IHRvVmFsdWUgPSB0YXJnZXRba2V5XTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodG9WYWx1ZSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IGFycmF5UHJvY2Vzc01ldGhvZCA/IGZyb21WYWx1ZSA6IFsuLi50b1ZhbHVlLCAuLi5mcm9tVmFsdWVdO1xuICAgICAgICB9IGVsc2UgaWYgKGZyb21WYWx1ZSAhPSBudWxsICYmIGlzT2JqZWN0KGZyb21WYWx1ZSkgJiYgdG9WYWx1ZSAhPSBudWxsICYmIGlzT2JqZWN0KHRvVmFsdWUpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBtZXJnZSh0b1ZhbHVlLCBmcm9tVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gZGVlcENvcHkoZnJvbVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBvYmplY3RzLmZpbHRlcih2ID0+IHYgIT0gbnVsbCAmJiBpc09iamVjdCh2KSkuZm9yRWFjaCh2ID0+IG1lcmdlKG9yaWdpbmFsLCB2KSk7XG5cbiAgcmV0dXJuIG9yaWdpbmFsO1xufVxuXG4vKipcbiAqIERlZXAgbWVyZ2Ugb2JqZWN0LlxuICpcbiAqIOa3seW6puWQiOW5tuWvueixoVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlKG9yaWdpbmFsOiBhbnksIC4uLm9iamVjdHM6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIGRlZXBNZXJnZUtleShvcmlnaW5hbCwgZmFsc2UsIC4uLm9iamVjdHMpO1xufVxuIl19