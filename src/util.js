/**
 * Created by ndyumin on 02.04.2016.
 */
const none = () => ({
    value: null,
    bind: fn => none()
});
const just = v => ({
    value: v,
    bind: fn => fn(v),
    lift: fn => just(fn(v))
});

const maybe = v => v != null
    ? just(v)
    : none();

const either = (left, right) => right != null
    ? just(right)
    : just(left);

module.exports = {
    none,
    just,
    maybe,
    either
};