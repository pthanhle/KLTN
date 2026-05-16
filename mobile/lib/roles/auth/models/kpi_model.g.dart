// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'kpi_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_RevenueMetric _$RevenueMetricFromJson(Map<String, dynamic> json) =>
    _RevenueMetric(
      current: (json['current'] as num).toDouble(),
      target: (json['target'] as num).toDouble(),
    );

Map<String, dynamic> _$RevenueMetricToJson(_RevenueMetric instance) =>
    <String, dynamic>{'current': instance.current, 'target': instance.target};

_CsatMetric _$CsatMetricFromJson(Map<String, dynamic> json) => _CsatMetric(
  score: (json['score'] as num).toDouble(),
  totalReviews: (json['totalReviews'] as num).toInt(),
  percentile: json['percentile'] as String,
);

Map<String, dynamic> _$CsatMetricToJson(_CsatMetric instance) =>
    <String, dynamic>{
      'score': instance.score,
      'totalReviews': instance.totalReviews,
      'percentile': instance.percentile,
    };

_EfficiencyMetric _$EfficiencyMetricFromJson(Map<String, dynamic> json) =>
    _EfficiencyMetric(
      billed: (json['billed'] as num).toDouble(),
      clocked: (json['clocked'] as num).toDouble(),
      rate: (json['rate'] as num).toDouble(),
    );

Map<String, dynamic> _$EfficiencyMetricToJson(_EfficiencyMetric instance) =>
    <String, dynamic>{
      'billed': instance.billed,
      'clocked': instance.clocked,
      'rate': instance.rate,
    };

_ReworkMetric _$ReworkMetricFromJson(Map<String, dynamic> json) =>
    _ReworkMetric(
      rate: (json['rate'] as num).toDouble(),
      trend: (json['trend'] as num).toDouble(),
    );

Map<String, dynamic> _$ReworkMetricToJson(_ReworkMetric instance) =>
    <String, dynamic>{'rate': instance.rate, 'trend': instance.trend};

_ValueMetric _$ValueMetricFromJson(Map<String, dynamic> json) => _ValueMetric(
  score: (json['score'] as num).toDouble(),
  target: (json['target'] as num).toDouble(),
);

Map<String, dynamic> _$ValueMetricToJson(_ValueMetric instance) =>
    <String, dynamic>{'score': instance.score, 'target': instance.target};

_TimeMetric _$TimeMetricFromJson(Map<String, dynamic> json) => _TimeMetric(
  time: (json['time'] as num).toDouble(),
  unit: json['unit'] as String,
);

Map<String, dynamic> _$TimeMetricToJson(_TimeMetric instance) =>
    <String, dynamic>{'time': instance.time, 'unit': instance.unit};

_RateMetric _$RateMetricFromJson(Map<String, dynamic> json) =>
    _RateMetric(rate: (json['rate'] as num).toDouble());

Map<String, dynamic> _$RateMetricToJson(_RateMetric instance) =>
    <String, dynamic>{'rate': instance.rate};

_KpiModel _$KpiModelFromJson(Map<String, dynamic> json) => _KpiModel(
  revenue: json['revenue'] == null
      ? null
      : RevenueMetric.fromJson(json['revenue'] as Map<String, dynamic>),
  csat: json['csat'] == null
      ? null
      : CsatMetric.fromJson(json['csat'] as Map<String, dynamic>),
  efficiency: json['efficiency'] == null
      ? null
      : EfficiencyMetric.fromJson(json['efficiency'] as Map<String, dynamic>),
  rework: json['rework'] == null
      ? null
      : ReworkMetric.fromJson(json['rework'] as Map<String, dynamic>),
  inventoryAccuracy: json['inventoryAccuracy'] == null
      ? null
      : ValueMetric.fromJson(json['inventoryAccuracy'] as Map<String, dynamic>),
  avgSla: json['avgSla'] == null
      ? null
      : TimeMetric.fromJson(json['avgSla'] as Map<String, dynamic>),
  transactionTime: json['transactionTime'] == null
      ? null
      : TimeMetric.fromJson(json['transactionTime'] as Map<String, dynamic>),
  errorRate: json['errorRate'] == null
      ? null
      : RateMetric.fromJson(json['errorRate'] as Map<String, dynamic>),
);

Map<String, dynamic> _$KpiModelToJson(_KpiModel instance) => <String, dynamic>{
  'revenue': instance.revenue,
  'csat': instance.csat,
  'efficiency': instance.efficiency,
  'rework': instance.rework,
  'inventoryAccuracy': instance.inventoryAccuracy,
  'avgSla': instance.avgSla,
  'transactionTime': instance.transactionTime,
  'errorRate': instance.errorRate,
};
