import 'package:freezed_annotation/freezed_annotation.dart';

part 'kpi_model.freezed.dart';
part 'kpi_model.g.dart';

@freezed
abstract class RevenueMetric with _$RevenueMetric {
  const factory RevenueMetric({
    required double current,
    required double target,
  }) = _RevenueMetric;

  factory RevenueMetric.fromJson(Map<String, dynamic> json) =>
      _$RevenueMetricFromJson(json);
}

@freezed
abstract class CsatMetric with _$CsatMetric {
  const factory CsatMetric({
    required double score,
    required int totalReviews,
    String? percentile,
  }) = _CsatMetric;

  factory CsatMetric.fromJson(Map<String, dynamic> json) =>
      _$CsatMetricFromJson(json);
}

@freezed
abstract class EfficiencyMetric with _$EfficiencyMetric {
  const factory EfficiencyMetric({
    required double billed,
    required double clocked,
    required double rate,
  }) = _EfficiencyMetric;

  factory EfficiencyMetric.fromJson(Map<String, dynamic> json) =>
      _$EfficiencyMetricFromJson(json);
}

@freezed
abstract class ReworkMetric with _$ReworkMetric {
  const factory ReworkMetric({
    required double rate,
    required double trend,
  }) = _ReworkMetric;

  factory ReworkMetric.fromJson(Map<String, dynamic> json) =>
      _$ReworkMetricFromJson(json);
}

@freezed
abstract class ValueMetric with _$ValueMetric {
  const factory ValueMetric({
    required double score,
    required double target,
  }) = _ValueMetric;

  factory ValueMetric.fromJson(Map<String, dynamic> json) =>
      _$ValueMetricFromJson(json);
}

@freezed
abstract class TimeMetric with _$TimeMetric {
  const factory TimeMetric({
    required double time,
    required String unit,
  }) = _TimeMetric;

  factory TimeMetric.fromJson(Map<String, dynamic> json) =>
      _$TimeMetricFromJson(json);
}

@freezed
abstract class RateMetric with _$RateMetric {
  const factory RateMetric({
    required double rate,
  }) = _RateMetric;

  factory RateMetric.fromJson(Map<String, dynamic> json) =>
      _$RateMetricFromJson(json);
}

@freezed
abstract class KpiModel with _$KpiModel {
  const KpiModel._();

  const factory KpiModel({
    RevenueMetric? revenue,
    CsatMetric? csat,
    EfficiencyMetric? efficiency,
    ReworkMetric? rework,
    ValueMetric? inventoryAccuracy,
    TimeMetric? avgSla,
    TimeMetric? transactionTime,
    RateMetric? errorRate,
  }) = _KpiModel;

  factory KpiModel.fromJson(Map<String, dynamic> json) =>
      _$KpiModelFromJson(json);
}
